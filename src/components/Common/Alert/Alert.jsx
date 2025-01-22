import { useAlert } from '@src/AlertContext';
import stylesAlert from "./Alert.scss";

const Alert = () => {
    const { alert, hideAlert } = useAlert();

    if (!alert.visible) return null;

    return (
        <div className={`alert alert-${alert.type}`}>
            <p>{alert.message}</p>
            <button onClick={hideAlert}>Zamknij</button>
        </div>
    );
};

export default Alert;