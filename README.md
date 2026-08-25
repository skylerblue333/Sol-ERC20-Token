# SKYCOIN4444 ERC-20 Engineering Lab

A focused Solidity engineering lab for verifying a minimal fixed-supply ERC-20 contract and its integration boundary. It is **not** a live token launch, investment product, audited contract, or production deployment.

## Implemented contract behavior

`SKYCOIN4444Token` uses OpenZeppelin ERC-20 primitives. The constructor accepts an initial supply expressed in base units, stores that value as `initialSupply`, and mints exactly that amount to the deployer. There is no public mint function, owner-only mint path, burn extension, upgrade proxy, tax/fee logic, blacklist, pause switch, staking system, sale contract, bridge, treasury mechanism, or deployment script in this repository.

Token metadata in the lab contract is:

- name: `SKYCOIN4444`
- symbol: `SKY4`
- decimals: OpenZeppelin ERC-20 default (`18`)

These values describe source code only. They do not establish a deployed asset or economic policy.

## Verification

```bash
npm install
npm run compile
npm test
npm audit --audit-level=high
```

The test suite verifies initial supply, deployer allocation, standard transfers, approvals/`transferFrom`, and insufficient-balance rejection. GitHub Actions runs compile, tests, and a high-severity dependency audit on `main`, product branches, and pull requests.

## Architecture

```text
contracts/SKYCOIN4444Token.sol
        |
        +-- OpenZeppelin ERC20
        |
        +-- Hardhat compile/test boundary
                 |
                 +-- local ephemeral Hardhat network
```

The product deliberately contains no deployment automation. Adding network deployment requires a separate reviewed change with explicit chain ID, signer/key-management strategy, deployment verification, address publication, and rollback/incident procedures.

## SKYCOIN4444 integration boundary

If the wider ecosystem eventually consumes this contract, applications should depend on a verified deployed address and ABI rather than copying contract source into each service. Wallet, finance, marketplace, and protocol components must treat token balances as external-chain state and must not infer deployment or value from this repository.

## Status

**Classification:** ENGINEERING LAB / beta contract component.

Verified only when the current branch's CI is green. Independent smart-contract review, deployment validation, economic review, chain/network selection, key custody, monitoring, multisig/governance, and production integration remain pending.

## Security boundaries

Do not commit private keys, mnemonics, RPC secrets, deployment credentials, or signing material. No contract should be deployed with real economic value based solely on this repository's unit tests. An independent security review is required before any production use.

## License

See `LICENSE` and applicable OpenZeppelin third-party licensing.
