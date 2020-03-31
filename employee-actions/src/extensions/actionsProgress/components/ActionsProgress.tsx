import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";

import styles from './ActionsProgress.module.scss';
import { ProgressIndicator } from 'office-ui-fabric-react';

export interface IActionsProgressProps {
  goal: number;
  categoryId: number;
}

export interface IActionsProgressState {
  actionsCount: number;
}

const LOG_SOURCE: string = 'ActionsProgress';

export default class ActionsProgress extends React.Component<IActionsProgressProps, IActionsProgressState> {


  constructor(props) {
    super(props);

    this.state = {
      actionsCount: 0
    }
  }

  @override
  public componentDidMount(): void {

    sp.web.lists.getByTitle("EmployeesActions")
    .items
      .filter(`ActionCategory/ID eq ${this.props.categoryId}`)
      .get()
      .then(data => {
        this.setState({actionsCount: data.length});
      });
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: ActionsProgress unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div>
        <ProgressIndicator description={`Registered actions: ${this.state.actionsCount}`} percentComplete={this.state.actionsCount / this.props.goal} />
      </div>
    );
  }
}
