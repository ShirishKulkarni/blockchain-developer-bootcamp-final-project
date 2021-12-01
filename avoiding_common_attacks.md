# Security considerations

## SWC-136 Unencrypted Private Data On-Chain

- Since the voting are to be kept secret until the reveal stage is reached, the committed votes are stored on-chain in an encrypted form on-chain.

## SWC-123 Requirement Violation

- The validations have been used at various stages to gaurd against actions that are not allowed.
  (Example: same voter cannot vote twice, cant vote in a concluded poll)

## SWC-115 Authorization through tx.origin

- Owner authentication is done using msg.sender and not tx.origin.
