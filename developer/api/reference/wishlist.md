---
title: Wishlist
description: Products the customer saved for later.
outline: 2
---

# Wishlist

Products the customer saved for later. The endpoints work without an account: the device keeps a wishlist token, the same way it keeps a cart token. A signed-in customer's guest wishlist is merged into their account when they sign in.

<OAOperation operation-id="getVisitorWishlist" />

<OAOperation operation-id="addVisitorWishlistItem" />

<OAOperation operation-id="removeVisitorWishlistItem" />
