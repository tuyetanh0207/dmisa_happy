import PropTypes from 'prop-types';
import styles from './button.module.css'
const AppButton = (props) => {
    const {title, bgColor, borderColor, textColor, width, height, paddingX, paddingY, borderRadius} = props;
    const buttonStyle = {
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        width: width,
        height: height,
        padding: `${paddingY}px ${paddingX}px`,
        borderRadius: borderRadius,
        fontWeight: 700,

    }

    return (
        <button style={{ ...buttonStyle }} className={styles.button}>{title}</button>
    )
}

AppButton.propTypes = {
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    textColor: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    paddingX: PropTypes.string,
    paddingY: PropTypes.string,
    borderRadius: PropTypes.string

};

export default AppButton;