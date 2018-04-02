pragma solidity ^0.4.17;
// Create compaign factory contract that deploys compaigns
// So we do not need to pay for each deployed compaign
contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        // create new campaign and return address of the deployed campaign
        // Need to pass manager as second argument for Campaign contract
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    // public - available for all; view - does not modify; returns array of addresses
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // Request contructor for compaign manager
    // struct type can not be modified or rewritten
    struct Request {
        string description;
        address recipient;
        uint value;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    // mapping is data type similar to JS objects, but without keys (no iteration)
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    // function modifier to lock access for use
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    // let creator to define a minimum contribution by passing argument to function
    function Campaign(uint minimum, address contractManager) public {
        // sender is the person who trying to create a campaign
        manager = contractManager;
        minimumContribution = minimum;
    }
    
    // payable - makes this function able to receive money
    function contribute() public payable {
        // msg.value - is amount in Wei that contributor wants to donate
        // if value is less then required, function throws error and exits
        require(msg.value > minimumContribution);
        
        // if dontation valid, add contributor to the approvers list
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        // create new request and push it to the request array
        // assign data type to memory for new variable, memory - short ; storage - long term
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        // shorthand to create new struct Request instance, need to follow argument order
        // Request(description, value, address, false)
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        // Check if person donated and voted
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        // Increment approval count and mark person as voted
        request.approvalCount++;
        request.approvals[msg.sender] = true;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        // check if request has been completed and if there are more than half approvals
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        
        // mark request as complete and transfer amount to recipient
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }
    
    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}