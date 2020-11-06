export const ModulesRegistry = {
    "LazyFeatureModule": async () => await import('./lazy-feature/lazy-feature.module'),
    "OtherLazyFeatureModule": async () => await import('./other-lazy-feature/other-lazy-feature.module'),
}  