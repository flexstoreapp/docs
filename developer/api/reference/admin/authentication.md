---
title: Authentication
description: Admin tokens for staff, including the two-factor challenge.
outline: 2
---

# Authentication

Tokens for the admin API. They carry the `admin` ability and are rejected by the storefront endpoints, and the other way round.

<OAOperation operation-id="adminLogin" />

<OAOperation operation-id="adminTwoFactorChallenge" />

<OAOperation operation-id="adminLogout" />

<OAOperation operation-id="adminMe" />
