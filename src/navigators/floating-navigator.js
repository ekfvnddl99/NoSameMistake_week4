import { createStackNavigator } from 'react-navigation-stack';
import RecordScreen from '../screens/RecordScreen';
import CategoryScreen from '../screens/CategoryScreen';
import { createAppContainer } from 'react-navigation';

const screens = {
    Record: { screen: RecordScreen },
    Category: { screen: CategoryScreen }
}

const recordstack = createStackNavigator(screens);

export default createAppContainer(recordstack);