---
title: Newsletter Drivers
description: How newsletter providers work and how to add a new one.
---

# Newsletter Drivers

Newsletter providers follow the same driver pattern as payment gateways, with a much simpler interface.

## Adding a Driver

### 1. Add the enum case

```php
// app/Enums/NewsletterProviderDriver.php
case MyProvider = 'my_provider';
```

### 2. Create the driver

```php
// app/Newsletter/Drivers/MyProviderDriver.php
final readonly class MyProviderDriver implements NewsletterDriver
{
    public function __construct(
        private NewsletterProvider $provider,
    ) {}

    public function subscribe(string $email): void
    {
        // Call the provider's API
    }
}
```

### 3. Register it in NewsletterManager

```php
// app/Newsletter/NewsletterManager.php → resolveDriver()
NewsletterProviderDriver::MyProvider => new MyProviderDriver($provider),
```

### 4. Add the admin UI

Create a credentials component and register it on the newsletter settings page. Credentials are stored as an `encrypted:array` JSON column on `newsletter_providers`.

## Testing

`NewsletterManager::fake()` swaps in a mock driver.
