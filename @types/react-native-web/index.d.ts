declare module 'react-native-web' {
  export namespace AppRegistry {
    function registerConfig(config: AppConfig[]): void;

    function registerComponent(
      appKey: string,
      getComponentFunc: ComponentProvider
    ): string;

    function registerRunnable(appKey: string, func: Runnable): string;

    function getAppKeys(): string[];

    function unmountApplicationComponentAtRootTag(rootTag: number): void;

    function runApplication(appKey: string, appParameters: any): void;

    function registerHeadlessTask(appKey: string, task: TaskProvider): void;

    function getRunnable(appKey: string): Runnable | undefined;

    function getApplication(appKey: string, appParameters?: object): any;
  }
}
