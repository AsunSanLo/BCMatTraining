import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PropertyPaneSampleWebPartStrings';
import PropertyPaneSample from './components/PropertyPaneSample';
import { IPropertyPaneSampleProps } from './components/IPropertyPaneSampleProps';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldTermPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
import { IPickerTerms } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";

import { AadHttpClient } from '@microsoft/sp-http';

export interface IPropertyPaneSampleWebPartProps {
  description: string;
  choice: string;
  maxItems: number;
  color: string;
  terms: IPickerTerms;
}

export default class PropertyPaneSampleWebPart extends BaseClientSideWebPart<IPropertyPaneSampleWebPartProps> {


  public async testAzureFunction() {

    const client = await this.context.aadHttpClientFactory.getClient("https://bcmatsanlo.azurewebsites.net");
    const response = await client.get(`https://bcmatsanlo.azurewebsites.net/api/hello?name=${this.context.pageContext.user.displayName}`, AadHttpClient.configurations.v1);
    const data = await response.text();
    alert("Azure function response: " + data);
  }


  public render(): void {

    this.testAzureFunction();

    const element: React.ReactElement<IPropertyPaneSampleProps> = React.createElement(
      PropertyPaneSample,
      {
        description: this.properties.description,
        choice: this.properties.choice,
        maxItems: this.properties.maxItems,
        color: this.properties.color,
        terms: this.properties.terms,
        graphClientFactory: this.context.msGraphClientFactory
      }
    );

    ReactDom.render(element, this.domElement);

  }

  protected get disableReactivePropertyChanges(): boolean {
    //return true; para deshabilitar cambios reactivos
    return false;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneSlider('maxItems', {
                  min: 0,
                  max: 20,
                  step: 2,
                  label: "Max items to show"
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyFieldTermPicker('terms', {
                  label: 'Select terms',
                  panelTitle: 'Select terms',
                  initialValues: this.properties.terms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  limitByGroupNameOrID: 'Planes',
                  limitByTermsetNameOrID: 'PlanesFinanciacion',
                  key: 'termSetsPickerFieldId'
                })
              ]
            }
          ]
        },
        {
          header: {
            description: "Segunda página"
          },
          groups: [
            {
              groupName: "Grupo 1",
              groupFields: [
                PropertyPaneChoiceGroup('choice', {
                  label: "My choice control",
                  options: [
                    {
                      key: "1",
                      text: "Option 1"
                    },
                    {
                      key: "2",
                      text: "Option 2"
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
