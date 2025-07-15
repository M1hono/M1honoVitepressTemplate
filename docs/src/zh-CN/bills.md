<script setup>
import { ref } from 'vue';

// Test data for automatic conversion and manual overrides
const conversionTestBills = ref([
  // Manual Override: 'exchanged-amount' is provided, so it should be used directly.
  {
    "date": "2024-07-25",
    "original-amount": 100,
    "original-unit": "USD",
    "exchanged-amount": 725.00, // Manually specified rate
    "target": "Specific Client Payment",
    "operator": "M1sh",
    "description": "Payment with a fixed exchange rate.Payment with a fixed exchange rate.Payment with a fixed exchange rate.Payment with a fixed exchange rate.Payment with a fixed exchange rate.Payment with a fixed exchange rate.Payment with a fixed exchange rate.",
    "type": "income"
  },
  // Automatic Conversion: 'exchanged-amount' is MISSING. The component must fetch the rate.
  {
    "date": "2024-07-20",
    "original-amount": 200,
    "original-unit": "EUR",
    // "exchanged-amount" is intentionally omitted
    "target": "Software Purchase",
    "operator": "M1sh",
    "description": "Automatic conversion from EUR to the target currency (CNY).",
    "type": "outlay"
  },
  // No conversion needed, treated as a base currency transaction.
  {
    "date": "2024-07-15",
    "exchanged-amount": 12000,
    "target": "Company Salary",
    "operator": "HR Dept",
    "description": "Base salary in CNY.",
    "type": "income"
  }
]);

// Test data for a different target currency (USD)
const usdTargetBills = ref([
    {
        "date": "2024-07-10",
        "original-amount": 1500,
        "original-unit": "GBP",
        // "exchanged-amount" is omitted to test auto-conversion to USD
        "target": "UK-based Client",
        "operator": "M1sh",
        "description": "Project fee from UK.",
        "type": "income"
    }
]);

</script>

# Smart Bills Component Tests

This page tests the intelligent features of the `Bills.vue` component, including automatic currency conversion and manual overrides.

## Test 1: Mixed Conversion (Target: CNY)

This test demonstrates the core functionality.
- The first item for "Specific Client Payment" has a **manual `exchanged-amount`** and should not be converted automatically.
- The second item for "Software Purchase" is in `EUR` and **lacks an `exchanged-amount`**, so it should be **automatically converted** to CNY.
- The third item is a standard CNY transaction.

<Bills :bills="conversionTestBills" currency="CNY" />

## Test 2: Automatic Conversion to USD

This test sets the target currency to `USD`. The component should fetch the GBP to USD exchange rate and display the result.

<Bills :bills="usdTargetBills" currency="USD" />

## Test 3: Empty State

This test ensures the component renders correctly when no data is provided.

<Bills :bills="[]" />
