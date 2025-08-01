# 📄 human-preferences.ts

## 🤖 AI Explanation

### What This File Does (ELI5)
This JavaScript/TypeScript module provides functionality that other parts of the application can use. It's like a service counter where other code can come to get specific tasks done.

### Real-World Analogy
This is like a moderate recipe in a cookbook. It has ingredients (dependencies), steps to follow (functions), and produces a specific result. Other recipes might reference this one as part of their process.

### When to Use This
• When other files need the functionality this module provides
• To use the utility functions this file exports

---

## 📊 Technical Details

| Property | Value |
|----------|-------|
| **Type** | typescript |
| **Size** | 15,305 bytes |
| **Lines** | 513 |
| **Complexity** | 6/10 |
| **Last Modified** | 2025-07-22 |

## 🔗 Dependencies

This file imports/requires:

- `./types`

## 📤 What This File Provides

Other files can use these from this file:

- `HUMAN_PREFERENCES`
- `getActivities`
- `getDesignStyles`
- `getDestinations`
- `getOperationTypes`
- `getPreferencesByTags`
- `getStyleForValue`

## ⚙️ Functions

-  `getOperationTypes()` (line 477)
-  `getDesignStyles()` (line 481)
-  `getActivities()` (line 489)
-  `getDestinations()` (line 497)
-  `getPreferencesByTags()` (line 501)
-  `getStyleForValue()` (line 507)

## 🔄 Used By

These files import/use this file:

- `src/config/index.ts`

## 💡 Quality Notes

- ⚠️ **Large file** - Consider splitting into smaller, focused files

---
*Generated by AI Shadow Mapper on 2025-07-23 06:20:53*