import {Constants} from "../constants";
import {_} from "../utils";

export interface RowPosition {
    rowIndex: number,
    rowPinned: string
}

export class RowPositionUtils {

    // tests if this row selection is before the other row selection
    public static before(rowA: RowPosition, rowB: RowPosition): boolean {
        switch (rowA.rowPinned) {
            case Constants.PINNED_TOP:
                // we we are floating top, and other isn't, then we are always before
                if (rowB.rowPinned !== Constants.PINNED_TOP) { return true; }
                break;
            case Constants.PINNED_BOTTOM:
                // if we are floating bottom, and the other isn't, then we are never before
                if (rowB.rowPinned !== Constants.PINNED_BOTTOM) { return false; }
                break;
            default:
                // if we are not floating, but the other one is floating...
                if (_.exists(rowB.rowPinned)) {
                    if (rowB.rowPinned === Constants.PINNED_TOP) {
                        // we are not floating, other is floating top, we are first
                        return false;
                    } else {
                        // we are not floating, other is floating bottom, we are always first
                        return true;
                    }
                }
                break;
        }
        return rowA.rowIndex < rowB.rowIndex;
    }
}
