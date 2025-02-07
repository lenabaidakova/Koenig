import KoenigCardWrapper from '../components/KoenigCardWrapper';
import MINIMAL_NODES from './MinimalNodes';
import React from 'react';
import cleanBasicHtml from '@tryghost/kg-clean-basic-html';
import {$generateHtmlFromNodes} from '@lexical/html';
import {CalloutNode as BaseCalloutNode, INSERT_CALLOUT_COMMAND} from '@tryghost/kg-default-nodes';
import {ReactComponent as CalloutCardIcon} from '../assets/icons/kg-card-type-callout.svg';
import {CalloutNodeComponent} from './CalloutNodeComponent';
import {populateNestedEditor, setupNestedEditor} from '../utils/nested-editors';

// re-export here so we don't need to import from multiple places throughout the app
export {INSERT_CALLOUT_COMMAND} from '@tryghost/kg-default-nodes';

export class CalloutNode extends BaseCalloutNode {
    __textEditor;
    __textEditorInitialState;

    static kgMenu = [{
        label: 'Callout',
        desc: 'Info boxes that stand out',
        Icon: CalloutCardIcon,
        insertCommand: INSERT_CALLOUT_COMMAND,
        matches: ['callout'],
        priority: 11
    }];

    getIcon() {
        return CalloutCardIcon;
    }

    constructor(dataset = {}, key) {
        super(dataset, key);

        // set up nested editor instances
        setupNestedEditor(this, '__textEditor', {editor: dataset.textEditor, nodes: MINIMAL_NODES});

        // populate nested editors on initial construction
        if (!dataset.textEditor && dataset.calloutText) {
            populateNestedEditor(this, '__textEditor', `<p>${dataset.calloutText}</p>`); // we serialize with no wrapper
        }
    }

    exportJSON() {
        const json = super.exportJSON();

        // convert nested editor instance back into HTML because `text` may not
        // be automatically updated when the nested editor changes
        if (this.__textEditor) {
            this.__textEditor.getEditorState().read(() => {
                const html = $generateHtmlFromNodes(this.__textEditor, null);
                const cleanedHtml = cleanBasicHtml(html);
                json.calloutText = cleanedHtml;
            });
        }

        return json;
    }

    createDOM() {
        return document.createElement('div');
    }

    getDataset() {
        const dataset = super.getDataset();

        // client-side only data properties such as nested editors
        const self = this.getLatest();
        dataset.textEditor = self.__textEditor;
        dataset.textEditorInitialState = self.__textEditorInitialState;

        return dataset;
    }

    updateDOM() {
        return false;
    }

    decorate() {
        return (
            <KoenigCardWrapper nodeKey={this.getKey()}>
                <CalloutNodeComponent
                    backgroundColor={this.__backgroundColor}
                    calloutEmoji={this.__calloutEmoji}
                    nodeKey={this.getKey()}
                    textEditor={this.__textEditor}
                    textEditorInitialState={this.__textEditorInitialState}
                />
            </KoenigCardWrapper>
        );
    }
}

export const $createCalloutNode = (dataset) => {
    return new CalloutNode(dataset);
};

export function $isCalloutNode(node) {
    return node instanceof CalloutNode;
}
