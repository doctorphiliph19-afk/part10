import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import theme from '../theme';

const orderOptions = {
  latest: {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highest: {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowest: {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e1e4e8',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selector: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  selectorText: {
    fontSize: 20,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  options: {
    backgroundColor: theme.colors.white,
    borderRadius: 3,
    paddingVertical: 8,
  },
  option: {
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories({
    orderBy: orderOptions[selectedOrder].orderBy,
    orderDirection: orderOptions[selectedOrder].orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });
  const navigate = useNavigate();

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <TextInput
            accessibilityLabel="Search repositories"
            onChangeText={setSearchKeyword}
            placeholder="Search repositories"
            style={styles.searchInput}
            value={searchKeyword}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => setSelectorVisible(true)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>
              {orderOptions[selectedOrder].label}
            </Text>
            <Text color="textSecondary">▼</Text>
          </Pressable>
          <Modal
            visible={selectorVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setSelectorVisible(false)}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectorVisible(false)}
              style={styles.modalBackdrop}
            >
              <View style={styles.options}>
                {Object.entries(orderOptions).map(([key, option]) => (
                  <Pressable
                    key={key}
                    accessibilityRole="button"
                    onPress={() => {
                      setSelectedOrder(key);
                      setSelectorVisible(false);
                    }}
                    style={styles.option}
                  >
                    <Text style={styles.selectorText}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>
      }
    />
  );
};

export default RepositoryList;
