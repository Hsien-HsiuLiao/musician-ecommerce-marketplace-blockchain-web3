# Avoiding common attacks

## Integer arithmetic overflow
SafeMath library used to increment counter by 1, library checks to make sure integer does not wraparound and overflow

## Reentrancy
Currently in the smart contract, no functions call external functions

## DoS with Block Gas Limit
Although not fully implemented, I have been working on a modifier to check if the input address is a band manager. Since the number of band managers can increase, and I am using a for loop to check if the address is in the array, I need to consider checking for gas usage so that executing the modifier does not run out of gas and fail. I will also investigate other ways to verify a band manager besides looping over an array.

## Tx.origin problem
msg.sender is always used in the contract


## Poison data
For song input, the type is set to text for song name and number for price on the front end. If an incorrect address is input for a band manager, the band manager panel will not be shown 

## Security Tools: 
used https://tool.smartdec.net/ to find vulnerabilities in smart contract


https://ethereum-contract-security-techniques-and-tips.readthedocs.io/en/latest/known_attacks/

Smart contract security topics
- Confidentiality/Access Control 
- Safe Math
- Contract Interactions
- Reentrancy
- Tx.origin
- Denial of Service
- Weak randomness
- Upgradeable mechanisms
- Replay attacks

Rust smart contract security
- https://www.youtube.com/watch?v=XCwLDfw317c
- https://www.youtube.com/watch?v=8kGrCCQBLwQ
- NEAR Rust Smart Contract Security course https://www.youtube.com/watch?v=DrRr6nru0no&list=PL7Gwuo_MOL740lhKTvouCJvk4sAyuqZqT
