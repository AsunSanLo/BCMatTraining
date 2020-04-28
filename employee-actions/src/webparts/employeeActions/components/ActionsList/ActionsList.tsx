import * as React from 'react';
import { IEmployeeAction } from '../../code/model/IEmployeeAction';
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Dialog } from '@microsoft/sp-dialog';

export interface IActionsListProps {
  items: Array<IEmployeeAction>;
  graphClientFactory: MSGraphClientFactory;
}
export class ActionsList extends React.Component<IActionsListProps, {}> {



  public createCalendarEvent = async (item: IEmployeeAction) => {
    const client = await this.props.graphClientFactory.getClient();
    await client.api("/me/calendar/events").post({
      "subject": item.Title,
      "body": {
        "contentType": "HTML",
        "content": `Employee action: ${item.Title}`
      },
      "start": {
        "dateTime": item.EventDate,
        "timeZone": "Europe/Berlin"
      },
      "end": {
        "dateTime": item.EventDate,
        "timeZone": "Europe/Berlin"
      }
    });

    Dialog.alert("Event created!");
  }


  public render() {
    return (<table>
      {this.props.items.map(item => {
        const dateDisplay = item.EventDate ? new Date(item.EventDate).toDateString() : null;
        return (<tr>
          <td>{item.ActionCategory.Title}</td>
          <td>{item.Title}</td>
          <td>
            {dateDisplay}
            {item.EventDate && <Icon iconName="Calendar" onClick={() => this.createCalendarEvent(item)} />}
          </td>
        </tr>);
      })}
    </table>);
  }
}
