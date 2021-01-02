import vex from 'vex-js';
import * as dialog from 'vex-dialog';

vex.registerPlugin(dialog.default);
vex.defaultOptions.className = 'vex-theme-flat-attack';

/**
 * Utility class to present stylable dialogs without the built in browser
 * functions.
 */
export class UIDialog {
    /**
     * Presents an alert with the given message.
     * @param message The message the alert will display
     */
    public alert(message: string): void {
        vex.dialog.alert(message);
    }

    /**
     * Opens a confirm dialog with the given message.
     * @param message The message the confirm dialog will display.
     * @returns A promise with based on the user selection.
     */
    public confirm(message: string): Promise<void> {
        return new Promise((resolve, reject) => {
            vex.dialog.confirm({
                message: message,
                callback: (result: boolean) => {
                    if (result) resolve();
                    else reject(new Error('Confirmation has been canceled.'));
                },
            });
        });
    }

    /**
     * Opens a prompt dialog with the given message.
     * @param message The message the prompt dialog will display.
     * @param placeholder Placeholder text to display in the input field.
     * @returns A promise with the answer of the user.
     */
    public prompt(message: string, placeholder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            vex.dialog.prompt({
                message: message,
                placeholder: placeholder,
                callback: (response?: string) => {
                    if (response) resolve(response);
                    else reject(new Error('Dialog has been canceled.'));
                },
            });
        });
    }
}

