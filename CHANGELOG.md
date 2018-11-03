# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [5.0.2] - 2018-11-03

#### Fixed

- PR #40: Fix backwards compatibility issue with React Fragments (thanks to @chadfawcett).
- PR #42: Update dependencies to Storybook 4.x (thanks to @itsdanielmatos).

## [5.0.1] - 2018-09-27

#### Changed

- Updated ref versions.

#### Fixed

- [Fix disabled styles when cropMarks is set to false](https://github.com/philcockfield/storybook-host/pull/38) thanks to @itsdanielmatos

## [5.0.0] - 2018-06-08

#### Changed

- Updated NPM refs.
- Switched from `radium` to `glamor` css (internal usage).

#### Removed

- `nomalize.css` reference.

## [4.1.5] - 2017-12-30

#### Changed

- Updated package.json to latest NPM refs.
- Added React `^16.0.0` to `peerDependencies`.

## [4.1.2] - 2017-12-30

#### Changed

- Updated package.json to latest NPM refs.
- Added React `^16.0.0` to `peerDependencies`.

## [4.1.1] - 2017-09-08

#### Changed

- TypeScript building to ES5 (target `/lib` folder).

## [4.1.0] - 2017-08-14

#### Removed

- Removed unused exports: `storiesOf`, `Story`, `knobs`.

## [4.0.0] - 2017-08-08

#### Changed

- Updated to latest versions of Storybook / Knobs.

#### Removed

- Remove MobX and MobX Devtools.

## [3.0.0] - 2017-06-07

#### Changed

- Update to Storybook 3.0.

## [1.1.0] - 2017-05-21

#### Changed

- Updated NPM references.
- Change default `mobXDevTools` to `false`.

## [1.0.14] - 2017-01-30

#### Added

- `flex:boolean` option to host.

## [1.0.0] - 2016-10-21

#### Added

- `<ComponentHost>` initial release.
