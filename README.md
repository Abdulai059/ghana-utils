# ghana-utils

Small, zero-dependency helpers for Ghana: phone validation, network detection and cedi formatting.

## Install

```bash
npm install ghana-utils
```

## Usage

```ts
import { validatePhone, normalizePhone, getNetwork, formatCedi } from "ghana-utils";

validatePhone("0244123456");     // true
normalizePhone("024 412 3456");  // "+233244123456"
getNetwork("0201234567");        // "Telecel"
formatCedi(1250);                // "GH₵1,250.00"
```

## API

### `validatePhone(input: string): boolean`
Returns `true` if the input is a valid Ghana mobile number.

### `normalizePhone(input: string): string | null`
Converts `0244123456`, `233244123456`, `+233 24 412 3456` and similar formats to `+233XXXXXXXXX`. Returns `null` if invalid.

### `getNetwork(input: string): "MTN" | "Telecel" | "AirtelTigo" | "Glo" | null`
Detects the network from the number prefix.

### `formatCedi(amount: number | string, options?): string | null`
Formats an amount as cedis. Options: `symbol` (default `GH₵`) and `decimals` (default `2`). Returns `null` for invalid input.

## Notes

- Network prefixes can change. If you find a wrong one, please open an issue.
- Amounts are rounded with `toFixed`, so some values like `1.005` may round down.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
