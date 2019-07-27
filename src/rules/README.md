## Usage

You can also enable all the recommended rules for our plugin. Add plugin:oclif/recommended in extends:

```ts
{
    "extends": ["plugin:oclif/recommended"]
}
```

## Supported Rules

<!-- begin rule list -->

**Key**: :heavy_check_mark: = recommended, :wrench: = fixable, :thought_balloon: = requires type information

<!-- oclif custom rules -->
| Name                                                                                                      | Description                                                                                                                                         | :heavy_check_mark: | :wrench: | :thought_balloon: |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- | ----------------- |
| [`oclif/command-class-variables`](./docs/rules/command-class-variable.md)         | Require that command class should have static description and static example                                                                                                        | :heavy_check_mark: |          |                   |
| [`oclif/no-multiple-flags`](./docs/rules/no-multiple-flags.md)                                             | Avoid using multiple flags with same character                                                                                                | :heavy_check_mark: |  |
