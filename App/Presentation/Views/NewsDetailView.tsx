import {WebView} from 'react-native-webview';
import {RootStackParamList} from '@App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NewsDetailViewProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsDetailView'
>;

const NewsDetailView = ({route, navigation}: NewsDetailViewProps) => {
  return <WebView source={{uri: route.params.url}} />;
};

export default NewsDetailView;
