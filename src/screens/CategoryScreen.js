import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Toast from 'react-native-simple-toast';
// import Icon from 'react-native-vector-icons/MaterialIcons'

// Sorry for the mess

const items = [
  {
    title: 'Workplace',
    id: 0,
  },
  {
    title: 'Relationships',
    id: 1,
  },
  {
    title: 'ToSelf',
    id: 2,
  },
]

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  switch: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
})

export default class CategoryScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      items: null,
      loading: false,
      selectedItems: [],
      selectedItems2: [],
      selectedItemObjects: [],
      currentItems: [],
      showDropDowns: false,
      single: false,
      readOnlyHeadings: false,
      highlightChildren: false,
      selectChildren: false,
      hideChipRemove: false,
      hasErrored: false,
    }
    this.termId = 100
    this.maxItems = 3
  }

  componentDidMount() {
    this.pretendToLoad()
    // programatically opening the select
    // this.SectionedMultiSelect._toggleSelector()
  }

  // custom icon renderer passed to iconRenderer prop
  // see the switch for possible icon name
  // values
  getProp = (object, key) => object && this.removerAcentos(object[key])

  rejectProp = (items, fn) => items.filter(fn)

  pretendToLoad = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, items })
    }, 4000)
  }

  // testing a custom filtering function that ignores accents
  removerAcentos = (s) => s.replace(/[\W\[\] ]/g, (a) => accentMap[a] || a)

  filterItems = (searchTerm, items, { subKey, displayKey, uniqueKey }) => {
    let filteredItems = []
    let newFilteredItems = []
    items.forEach((item) => {
      const parts = this.removerAcentos(searchTerm.trim()).split(/[[ \][)(\\/?\-:]+/)
      const regex = new RegExp(`(${parts.join('|')})`, 'i')
      if (regex.test(this.getProp(item, displayKey))) {
        filteredItems.push(item)
      }
      if (item[subKey]) {
        const newItem = Object.assign({}, item)
        newItem[subKey] = []
        item[subKey].forEach((sub) => {
          if (regex.test(this.getProp(sub, displayKey))) {
            newItem[subKey] = [...newItem[subKey], sub]
            newFilteredItems = this.rejectProp(
              filteredItems,
              (singleItem) => item[uniqueKey] !== singleItem[uniqueKey]
            )
            newFilteredItems.push(newItem)
            filteredItems = newFilteredItems
          }
        })
      }
    })
    return filteredItems
  }

  onSelectedItemsChange = (selectedItems) => {
    console.log(selectedItems, selectedItems.length)

    if (selectedItems.length >= this.maxItems) {
      if (selectedItems.length === this.maxItems) {
        this.setState({ selectedItems })
      }
      this.setState({
        maxItems: true,
      })
      return
    }
    this.setState({
      maxItems: false,
    })

    const filteredItems = selectedItems.filter((val) => !this.state.selectedItems2.includes(val))
    this.setState({ selectedItems: filteredItems })
  }

  onSelectedItemsChange2 = (selectedItems) => {
    const filteredItems = selectedItems.filter((val) => !this.state.selectedItems.includes(val))
    this.setState({ selectedItems2: filteredItems })
  }

  onConfirm = () => {
    this.setState({ currentItems: this.state.selectedItems })
  }
  onCancel = () => {
    this.SectionedMultiSelect._removeAllItems()

    this.setState({
      selectedItems: this.state.currentItems,
    })
    console.log(this.state.selectedItems)
  }
  onSelectedItemObjectsChange = (selectedItemObjects) => {
    this.setState({ selectedItemObjects })
    console.log(selectedItemObjects)
  }

  onSwitchToggle = (k) => {
    const v = !this.state[k]
    this.setState({ [k]: v })
  }

  fetchCategories = () => {
    this.setState({ hasErrored: false })
    fetch('http://www.mocky.io/v2/5a5573a22f00005c04beea49?mocky-delay=500ms', {
      headers: 'no-cache',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ cats: responseJson })
      })
      .catch((error) => {
        this.setState({ hasErrored: true })
        throw error.message
      })
  }
  filterDuplicates = (items) =>
    items.sort().reduce((accumulator, current) => {
      const length = accumulator.length
      if (length === 0 || accumulator[length - 1] !== current) {
        accumulator.push(current)
      }
      return accumulator
    }, [])

  noResults = (
    <View key="a" style={styles.center}>
      <Text>Sorry! No results...</Text>
    </View>
  )

  handleAddSearchTerm = () => {
    const searchTerm = this.SectionedMultiSelect._getSearchTerm()
    const id = (this.termId += 1)
    if (
      searchTerm.length &&
      !(this.state.items || []).some((item) => item.title.includes(searchTerm))
    ) {
      const newItem = { id, title: searchTerm }
      this.setState((prevState) => ({
        items: [...(prevState.items || []), newItem],
      }))
      this.onSelectedItemsChange([...this.state.selectedItems, id])
      this.SectionedMultiSelect._submitSelection()
    }
  }

  searchAdornment = (searchTerm) =>
    searchTerm.length ? (
      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center' }}
        onPress={this.handleAddSearchTerm}
      >
        <View style={{}}>
          <Image
            source={{ uri: 'https://png.icons8.com/plus' }}
            style={{ width: 16, height: 16, marginHorizontal: 15 }}
          />
          {/*   <Icon size={18} style={{ marginHorizontal: 15 }} name="add" /> */}
        </View>
      </TouchableOpacity>
    ) : null;

  renderSelectText = () => {
    const { selectedItemObjects } = this.state

    const selectText = selectedItemObjects.length
      ? `chosen category ${selectedItemObjects
        .map((item, i) => {
          let label = `${item.title}, `
          if (i === selectedItemObjects.length - 2) label = `${item.title} and `
          if (i === selectedItemObjects.length - 1) label = `${item.title}.`
          return label
        })
        .join('')}`
      : 'Select a category'
    return <Text style={{ color: 'black', fontSize: 20 }}>{selectText}</Text>
  }

  SelectOrRemoveAll = () =>
    this.SectionedMultiSelect && (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          height: 44,
          borderWidth: 0,
          paddingHorizontal: 10,
          backgroundColor: 'darkgrey',
          alignItems: 'center',
        }}
        onPress={
          this.state.selectedItems.length
            ? this.SectionedMultiSelect._removeAllItems
            : this.SectionedMultiSelect._selectAllItems
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {this.state.selectedItems.length ? 'Remove' : 'Select'} all
        </Text>
      </TouchableOpacity>
    )

  onToggleSelector = (toggled) => {
    console.log('selector is ', toggled ? 'open' : 'closed')
  }
  customChipsRenderer = (props) => {
    console.log('props', props)
    return (
      <View style={{ backgroundColor: 'yellow', padding: 15 }}>
        <Text>Selected:</Text>
        {props.selectedItems.map((singleSelectedItem) => {
          const item = this.SectionedMultiSelect._findItem(singleSelectedItem)

          if (!item || !item[props.displayKey]) return null

          return (
            <View
              key={item[props.uniqueKey]}
              style={{
                flex: 0,
                marginRight: 5,
                padding: 10,
                backgroundColor: 'orange',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.SectionedMultiSelect._removeItem(item)
                }}
              >
                <Text>{item[props.displayKey]}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: '#f8f8f8' }}
        contentContainerStyle={styles.container}
      >
        <SectionedMultiSelect
          items={this.state.items}
          // ref={(SectionedMultiSelect) => (this.SectionedMultiSelect = SectionedMultiSelect)}
          uniqueKey="id"
          subKey="children"
          displayKey="title"
          autoFocus
          loading={this.state.loading} // loading 없으면 sorry, no items 뜸
          renderSelectText={this.renderSelectText}
          showRemoveAll
          onSelectedItemsChange={this.onSelectedItemsChange}
          onConfirm={this.onConfirm}
          confirmText={`${this.state.selectedItems.length}/${this.maxItems} - ${
            this.state.maxItems ? 'Max selected' : 'Confirm'
            }`}
          selectedItems={this.state.selectedItems}
          colors={{ primary: '#5c3a9e', success: '#5c3a9e' }}
          itemNumberOfLines={3}
          selectLabelNumberOfLines={3}
          styles={{
            item: {
              paddingHorizontal: 10,
            },
            subItem: {
              paddingHorizontal: 10,
            },
            selectedItem: {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
            selectedSubItem: {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
            scrollView: { paddingHorizontal: 0 },
          }}
        />
      </ScrollView>
    )
  }
}