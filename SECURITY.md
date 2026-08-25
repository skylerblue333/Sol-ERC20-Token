# Security Policy

This repository is an ERC-20 engineering lab, not an audited or deployed production token.

## Report vulnerabilities

Report suspected vulnerabilities privately through GitHub's security-reporting mechanisms where available. Do not publish exploitable details before maintainers have had an opportunity to evaluate them.

## Security scope

Review should cover Solidity compiler assumptions, OpenZeppelin dependency changes, supply invariants, standard ERC-20 transfer/allowance behavior, deployment configuration, signer/key custody, and any future privileged functions.

## Production boundary

Unit tests and dependency audit are necessary but insufficient for production use. Before any deployment carrying real economic value, require an independent smart-contract review, reproducible deployment procedure, verified source/address, explicit network and chain ID, protected signing keys, and incident/monitoring procedures.

Never commit private keys, mnemonics, RPC credentials, or deployment secrets.
