import * as React from 'react';
import styles from './PropertyPaneSample.module.scss';
import { IPropertyPaneSampleProps } from './IPropertyPaneSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PropertyPaneSample extends React.Component<IPropertyPaneSampleProps, {}> {


  public componentDidMount() {
    this.testGraph();
  }

  public async testGraph() {
    const client = await this.props.graphClientFactory.getClient();
    const data = await client.api("/me").get();
    console.log("user data", data);
    return data;
  }

  public render(): React.ReactElement<IPropertyPaneSampleProps> {
    return (
      <div>
        <h1>Property Pane Sample</h1>
        <div>Description: {this.props.description} </div>
        <div>Choice: {this.props.choice}</div>
        <div>Max items: {this.props.maxItems} </div>
        <div>Color: {this.props.color}</div>
        <div>
          <span>Terms: </span>
          <ul>
            {this.props.terms && this.props.terms.map(term => <li>{term.name}</li> )}
          </ul>

        </div>
      </div>
    );
  }
}
