import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ActionsNotificationApplicationCustomizerStrings';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {ActionsNotification} from './ActionsNotification/ActionsNotification';

const LOG_SOURCE: string = 'ActionsNotificationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IActionsNotificationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ActionsNotificationApplicationCustomizer
  extends BaseApplicationCustomizer<IActionsNotificationApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

    const topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);

    const actionsProgress: React.ReactElement<{}> = React.createElement(ActionsNotification);
    ReactDOM.render(actionsProgress, topPlaceholder.domElement);

    return Promise.resolve();
  }
}
