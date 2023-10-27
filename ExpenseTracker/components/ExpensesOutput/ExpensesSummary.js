import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({periodName, expenses}) => {
    const expensesSum = expenses.reduce((sum, expense) => { //method to combine multiple values
        return (
            sum + expense.amount
        );
    }, 0); //starting value 

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    }
});