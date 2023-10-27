import { StyleSheet, View } from 'react-native';
import { useLayoutEffect, useContext, useState } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpenses = ({route, navigation}) => {
    //to manage when something is loading
    const [isSubmitting, setIsSubmitting] = useState(false);

    //error handling
    const [error, setError] = useState();

    //show screen based on whether to edit or to add
    const editedExpenseId = route.params?.expenseId; //use ? to safely drill into obj that might be undefined
    const isEditing = !!editedExpenseId; //convert to boolean

    const expenseCtx = useContext(ExpensesContext);

    const selectedExpense = expenseCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true); //dont need to set to false since we are leaving this screen anyways
        try {
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - please try again later');
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);

        try {
            if (isEditing) {
                expenseCtx.updateExpense(editedExpenseId, expenseData); //local first
                await updateExpense(editedExpenseId, expenseData); //then update the backend
            } else {
                const id = await storeExpense(expenseData); //axios first
                expenseCtx.addExpense({...expenseData, id: id}); //then local since it relies on backend
            }

            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later');
            setIsSubmitting(false);
        }
    }
    

    if (error & !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonLabel={isEditing ? 'Update' : 'Add'} 
                onSubmit={confirmHandler} 
                onCancel={cancelHandler}
                titleLabel={isEditing ? 'Edit your' : 'Add a'}
                defaultValues={selectedExpense}
            />            
            {isEditing && 
            <View style={styles.deleteContainer}>
                <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
            </View>
            }
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        margin: 16,
        padding: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
    
});