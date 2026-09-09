---
title: Orders
description: Order detail, statuses, timeline, fulfilment, payments and refunds.
outline: 2
---

# Orders

Everything you can do to an order, in roughly the sequence an order moves through: read it, annotate it, move its status, ship it, settle the money, and cancel it. Every status change writes a timeline entry, the same feed the note endpoints append to.

<OAOperation operation-id="adminListOrders" />

<OAOperation operation-id="adminGetOrder" />

<OAOperation operation-id="adminListOrderActivities" />

<OAOperation operation-id="adminCreateOrderNote" />

<OAOperation operation-id="adminUpdateOrderNote" />

<OAOperation operation-id="adminDeleteOrderNote" />

<OAOperation operation-id="adminStartOrderProgress" />

<OAOperation operation-id="adminHoldOrder" />

<OAOperation operation-id="adminReleaseOrderHold" />

<OAOperation operation-id="adminCreateOrderShipment" />

<OAOperation operation-id="adminUpdateOrderShipment" />

<OAOperation operation-id="adminSyncShipmentTracking" />

<OAOperation operation-id="adminDeleteOrderShipment" />

<OAOperation operation-id="adminRecordOrderPayment" />

<OAOperation operation-id="adminVoidOrderPayment" />

<OAOperation operation-id="adminShowOrderRefundOptions" />

<OAOperation operation-id="adminCreateOrderRefund" />

<OAOperation operation-id="adminRefundOrderCredit" />

<OAOperation operation-id="adminResendOrderNotification" />

<OAOperation operation-id="adminCancelOrder" />
