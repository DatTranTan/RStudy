import { PDFViewerType } from "../../types";
import * as SC from "./styled";

export const PDFViewer = ({ url }: PDFViewerType) => {
  return <SC.Wrapper>{url}</SC.Wrapper>;
};
