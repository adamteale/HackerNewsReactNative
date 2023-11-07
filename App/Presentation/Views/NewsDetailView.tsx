import {WebView} from 'react-native-webview';
import {RootStackParamList} from '@App';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type NewsDetailViewProps = {
  route: RouteProp<RootStackParamList, 'NewsDetailView'>;
  navigation: StackNavigationProp<RootStackParamList, 'NewsDetailView'>;
};

const NewsDetailView: React.FC<NewsDetailViewProps> = ({route, navigation}) => {
  return <WebView source={{uri: route.params.url}} />;
};

export default NewsDetailView;
