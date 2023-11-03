import {SafeAreaView, StatusBar, FlatList, Text, View} from 'react-native';
import {useNewsListViewModel} from '../ViewModel/useNewsListViewModel';
import {NewsListCellView} from '../Components/NewsListCellView';
import ListCellSeperatorView from '../Components/ListCellSeparatorView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

export type NewsListViewProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsList'
>;

const NewsListView = ({route, navigation}: NewsListViewProps) => {
  const {newsItems, onDeleteItem, onUpdateNewsItems, refreshing} =
    useNewsListViewModel();
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="#b3e6ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
      />

      <FlatList
        style={{height: '100%'}}
        data={newsItems}
        ItemSeparatorComponent={() => <ListCellSeperatorView />}
        renderItem={({item}) => (
          <NewsListCellView
            props={{
              onDelete: onDeleteItem,
              newsItem: item,
              onPress: () => {
                const props = {
                  url: item.url ?? '',
                };
                navigation.navigate('NewsDetailView', props);
              },
            }}
          />
        )}
        refreshing={refreshing}
        onRefresh={onUpdateNewsItems}
        testID="newsItemList"
      />
    </SafeAreaView>
  );
};

export default NewsListView;
