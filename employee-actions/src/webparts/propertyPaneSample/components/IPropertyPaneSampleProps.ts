
import { IPickerTerms } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";
import { MSGraphClientFactory } from '@microsoft/sp-http';

export interface IPropertyPaneSampleProps {
  description: string;
  choice: string;
  maxItems: number;
  color: string;
  terms: IPickerTerms;
  graphClientFactory: MSGraphClientFactory;
}
