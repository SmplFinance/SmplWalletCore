import {KeycloakOptions} from 'keycloak-angular';

export interface SmplWalletCoreOptions {
  vaultChainWalletServiceUrl: URL;
  queryUrl: URL;
  txUrl: URL;
  smplSecretsVaultFaucetUrl: URL;
  keycloakOptions: KeycloakOptions;
}
