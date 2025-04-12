export default function DeleteConfirmation({ onConfirm, onCancel}) {

    return (
        <div>
            <h2>Delete item?</h2>
            <p>Do you want to delete this?</p>
            <div>
                <button onClick={onCancel}>
                    No
                </button>
                <button onClick={onConfirm}>
                    Yes
                </button>
            </div>
        </div>
    );
}