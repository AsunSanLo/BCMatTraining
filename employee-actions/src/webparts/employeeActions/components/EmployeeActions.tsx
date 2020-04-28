import * as React from 'react';
import styles from './EmployeeActions.module.scss';
import { IEmployeeActionsProps } from './IEmployeeActionsProps';
import { ActionsList } from "./ActionsList/ActionsList";
import { PrimaryButton, Separator, TextField, DatePicker, Dropdown, IDropdownOption, Spinner } from 'office-ui-fabric-react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import { IEmployeeAction } from '../code/model/IEmployeeAction';
import { IActionCategory } from '../code/model/IActionCategory';
import { NewEmployeeAction } from '../code/model/NewEmployeeAction';

export interface IEmployeeActionsState {
  list: Array<IEmployeeAction>;
  categories: Array<IActionCategory>;
  newAction: NewEmployeeAction;
  loading: boolean;
}

export default class EmployeeActions extends React.Component<IEmployeeActionsProps, IEmployeeActionsState> {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      categories: [],
      newAction: {
        Title: "Hello",
        EventDate: null,
        ActionCategoryId: null
      }
    }
  }

  public componentDidMount() {
    this._loadActions();
    sp.web.lists.getByTitle("EmployeesCategories").items
    .select("Id", "Title")
    .get<IActionCategory[]>()
    .then(data => {
      this.setState({categories: data, loading: false});
    });
  }

  private _loadActions = () => {
    sp.web.lists.getByTitle("EmployeesActions").items
      .select("ID", "Title", "EventDate", "ActionCategory/Title", "ActionCategory/ID")
      .expand("ActionCategory/Id")
      .get<IEmployeeAction[]>()
      .then(data => {
        this.setState({list: data});
      });

  }

  private _addItem = () => {
    sp.web.lists.getByTitle("EmployeesActions").items.add(this.state.newAction).then(() => {
      this.setState({
        newAction: new NewEmployeeAction()
      });
      this._loadActions();
    });

  }

  private _onCategoryChange = (event, option: IDropdownOption) => {
    this.setState({
      newAction: {
        ...this.state.newAction,
        ActionCategoryId: option.key.valueOf() as number
      }
    });
  }
  private _onTitleChange = (event, newValue: string) => {
    this.setState({
      newAction: {
        ...this.state.newAction,
        Title: newValue
      }
    });
  }
  private _onEventDateChange = (date: Date) => {
    this.setState({
      newAction: {
        ...this.state.newAction,
        EventDate: date
      }
    });
  }

  public render(): React.ReactElement<IEmployeeActionsProps> {
    if (this.state.loading) return <Spinner />;
    return (
      <div className={styles.employeeActions}>
         <ActionsList items={this.state.list} graphClientFactory={this.props.graphClientFactory} />

         <Separator >Add action</Separator>
         <div>
           <Dropdown
            label="Category"
            options={this.state.categories.map(category => ({
              key: category.Id,
              text: category.Title
            }))}
            onChange={this._onCategoryChange}
            selectedKey={this.state.newAction.ActionCategoryId}
           />
            <TextField label="Title" onChange={this._onTitleChange} value={this.state.newAction.Title} />
            <DatePicker
              placeholder="Select a date"
              label="Event Date"
              onSelectDate={this._onEventDateChange}
              value={this.state.newAction.EventDate}
            />
            <br/>
            <PrimaryButton text="Add action" onClick={this._addItem} />
         </div>
      </div>
    );
  }
}
