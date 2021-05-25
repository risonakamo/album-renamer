import {createStore,combineReducers} from "redux";
import {createReducer,createAction} from "@reduxjs/toolkit";
import _ from "lodash";

const AddSelectedImageAction=createAction<ImageData2>("add-selected-image");
const RemoveSelectedImageAction=createAction<ImageData2>("remove-selected-image");

const imageGroupsReducer=createReducer<ImageGroup[]>([],(b)=>{

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
});

const thestore=createStore(combineReducers<TheStore>({
    imageGroups:imageGroupsReducer,
    selectedImages:selectedImagesReducer
}));

export default thestore;