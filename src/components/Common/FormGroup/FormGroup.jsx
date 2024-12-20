import PropTypes from "prop-types";
import stylesFormGroup from "./FormGroup.module.scss";

function FormGroup(props) {
    return <div className={stylesFormGroup.formGroup}>
        <label htmlFor={props.name} className={stylesFormGroup.formLabel}>{props.label}</label>
        <input type={props.type} className={stylesFormGroup.formInput} name={props.name} placeholder={props.label}
               value={props.value} onChange={props.onChange} required />
    </div>

}

FormGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
}

export default FormGroup