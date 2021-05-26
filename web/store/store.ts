import {createStore,combineReducers} from "redux";
import {createReducer,createAction} from "@reduxjs/toolkit";
import _ from "lodash";

import {dropAtTarget,dropAtTargetGroup,replaceGroup,addGroup} from "lib/image-group-helpers";

const AddSelectedImageAction=createAction<ImageData2>("add-selected-image");
const RemoveSelectedImageAction=createAction<ImageData2>("remove-selected-image");
const DeselectAllAction=createAction("deselect-all");

/** move items after a target item. clears selection if set to clear selection */
const DropAtTargetAction=createAction<DropAtTargetPayload>("drop-at-target");
/** move items to front of target group */
const DropAtTargetGroupAction=createAction<DropAtTargetGroupPayload>("drop-at-group");

/** replace a group, matched by group key */
const UpdateGroupAction=createAction<ImageGroup>("update-group");

const AddEmptyGroup=createAction("new-group");
const AddGroupWithItems=createAction<ImageData2[]>("new-group-with-items");

const imageGroupsReducer=createReducer<ImageGroup[]>([],(b)=>{
    b.addCase(DropAtTargetAction,(state,act)=>{
        return dropAtTarget(act.payload.droptarget,act.payload.items,state);
    });

    b.addCase(DropAtTargetGroupAction,(state,act)=>{
        return dropAtTargetGroup(act.payload.dropgroup,act.payload.items,state);
    });

    b.addCase(UpdateGroupAction,(state,act)=>{
        return replaceGroup(act.payload,state);
    });

    b.addCase(AddEmptyGroup,(state,act)=>{
        return addGroup([],state).groups;
    });

    b.addCase(AddGroupWithItems,(state,act)=>{
        var newgroup:ImageGroup;
        var groups:ImageGroup[];
        var {newgroup,groups}=addGroup(act.payload,state);

        return dropAtTargetGroup(newgroup,act.payload,groups);
    });
});

const selectedImagesReducer=createReducer<ImageData2[]>([],(b)=>{
    b.addCase(AddSelectedImageAction,(state,act)=>{
        state.push(act.payload);
    });

    b.addCase(RemoveSelectedImageAction,(state,act)=>{
        return _.reject(state,(x:ImageData2):boolean=>{
            return x.path==act.payload.path;
        });
    });

    // drop at target causes selection to clear
    b.addCase(DropAtTargetAction,(state,act)=>{
        if (act.payload.clearSelection)
        {
            return [];
        }

        return state;
    });

    b.addCase(DropAtTargetGroupAction,(state,act)=>{
        if (act.payload.clearSelection)
        {
            return [];
        }

        return state;
    });

    b.addCase(DeselectAllAction,(state,act)=>{
        return [];
    });
});

const thestore=createStore(combineReducers<TheStore>({
    imageGroups:imageGroupsReducer,
    selectedImages:selectedImagesReducer
}));

export default thestore;