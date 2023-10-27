import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, titleLabel, defaultValues, invalid}) => {
    const [Inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
          },
          date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
          },
          description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
          },
    });
    
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
            ...curInputs,
            [inputIdentifier]: {value: enteredValue, isValid: true},
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +Inputs.amount.value,
            date: new Date(Inputs.date.value),
            description: Inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    }
    const formIsInvalid = !Inputs.amount.isValid || !Inputs.date.isValid || !Inputs.description.isValid;

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>{titleLabel} Purchase</Text>
            <View style={styles.flexContainer}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!Inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: Inputs.amount.value,
                    }}
                />
                <Input
                style={styles.rowInput}
                label="Date"
                invalid={!Inputs.date.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: Inputs.date.value,
                }}
                />
            </View>
            <Input
                label="Description"
                invalid={!Inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                // autoCapitalize: 'none'
                // autoCorrect: false // default is true
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: Inputs.description.value,
                }}
            />

            {formIsInvalid && (
                <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
            )}

            <View style={styles.buttons}>
                <Button style={styles.button}mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingBottom: 16,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //dedicated styles to the cancel and add buttons
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },

    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
        margin: 8,
    },
});