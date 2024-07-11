// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CvWallet is ERC721, Ownable {
    struct Skill {
        string name;
        uint256 level; // 1-100
        address[] verifiers;
        bool isVerified;
    }

    mapping(uint256 => Skill) public skills;
    uint256 public nextSkillId = 1;
    address public aiAgentAddress;

    event SkillAdded(uint256 indexed skillId, string name, uint256 level);
    event SkillVerified(uint256 indexed skillId, address verifier);
    event SkillUpdated(uint256 indexed skillId, uint256 newLevel);

    constructor(address _aiAgentAddress) ERC721("CvWallet", "CVW") {
        aiAgentAddress = _aiAgentAddress;
    }

    function setAiAgentAddress(address _newAiAgentAddress) public onlyOwner {
        aiAgentAddress = _newAiAgentAddress;
    }

    function addSkill(string memory _name, uint256 _level) public {
        require(_level > 0 && _level <= 100, "Level must be between 1 and 100");
        
        uint256 newSkillId = nextSkillId;
        skills[newSkillId] = Skill(_name, _level, new address[](0), false);
        _safeMint(msg.sender, newSkillId);
        
        emit SkillAdded(newSkillId, _name, _level);
        nextSkillId++;
    }

    function verifySkill(uint256 _skillId) public {
        require(_exists(_skillId), "Skill does not exist");
        require(msg.sender != ownerOf(_skillId), "Owner cannot verify their own skill");
        
        Skill storage skill = skills[_skillId];
        require(!skill.isVerified, "Skill is already verified");

        if (msg.sender == aiAgentAddress) {
            skill.isVerified = true;
            skill.verifiers = [msg.sender];
        } else {
            require(skill.verifiers.length < 2, "Skill already has two verifiers");
            require(!_containsAddress(skill.verifiers, msg.sender), "Address has already verified this skill");

            skill.verifiers.push(msg.sender);
            if (skill.verifiers.length == 2) {
                skill.isVerified = true;
            }
        }

        emit SkillVerified(_skillId, msg.sender);
    }

    function getSkill(uint256 _skillId) public view returns (string memory, uint256, address[] memory, bool) {
        require(_exists(_skillId), "Skill does not exist");
        Skill memory skill = skills[_skillId];
        return (skill.name, skill.level, skill.verifiers, skill.isVerified);
    }

    function updateSkillLevel(uint256 _skillId, uint256 _newLevel) public {
        require(_exists(_skillId), "Skill does not exist");
        require(msg.sender == ownerOf(_skillId), "Only skill owner can update level");
        require(_newLevel > 0 && _newLevel <= 100, "Level must be between 1 and 100");

        Skill storage skill = skills[_skillId];
        skill.level = _newLevel;
        skill.isVerified = false;
        skill.verifiers = new address[](0);

        emit SkillUpdated(_skillId, _newLevel);
    }

    function _containsAddress(address[] memory addresses, address addr) private pure returns (bool) {
        for (uint i = 0; i < addresses.length; i++) {
            if (addresses[i] == addr) {
                return true;
            }
        }
        return false;
    }
}
