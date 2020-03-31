import * as React from 'react';
import { IEmployeeAction } from '../../code/model/IEmployeeAction';

export interface IActionsListProps {
  items: Array<IEmployeeAction>;
}
export class ActionsList extends React.Component<IActionsListProps, {}> {

  public render() {
    return (<table>
      {this.props.items.map(item => {
        const dateDisplay = item.EventDate ? new Date(item.EventDate).toDateString() : null;
        return (<tr>
          <td>{item.ActionCategory.Title}</td>
          <td>{item.Title}</td>
          <td>{dateDisplay}</td>
        </tr>);
      })}
    </table>);
  }
}
