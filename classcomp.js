class ProfileScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        getProfile: {fetching: false, data: null, err: null},
      };
    }
  
    static getDerivedStateFromProps(nextProps, prevState) {
      return {getProfile: nextProps.getProfile};
    }
  
    state = {  
      switchValue: true  
    };  
  
    
  
    
  
    
  
    getUserProfile = () => {
      this.props.onCallApi(getProfileRequest('duytq94'));
    };
  
    goDetail = () => {
      this.props.navigation.navigate('DetailProfileScreen');
    };
  
    onMenuPress = () => {
      this.props.navigation.openDrawer();
    };
  
    onExitPress = () => {
      TestConnectNative.exitRN(rootTag);
    };
  
    render() {
      return (
        <View style={styles.mainContainer}>
          {this.renderToolbar()}
  
  
          {/** 
          <TouchableOpacity
            style={styles.btnGetData}
            onPress={this.getUserProfile}>
            <Text style={styles.textGetData}>Get profile</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.btnGetData} onPress={this.goDetail}>
            <Text style={styles.textGetData}>about</Text>
          </TouchableOpacity>
          */}
  
          <View style={styles.body}>
            
            
            <Image source={require('./ins.png')}  style={{width: 200, height: 200, marginTop: 100 }}/> 
  
            <Image source={require('./car.png')}  style={{width: 140, height: 140, }}/> 
            
            
            
            
            <Text style={styles.textData}>{this.state.switchValue ? 'Insurance is ON' :'Insurance is OFF'}</Text>  
                  <Switch 
                      style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }],marginTop:50 }}  
                      value={this.state.switchValue}  
                      onValueChange ={(switchValue)=>this.setState({switchValue})}/>
        
  
          </View>
  
          
  
          
  
          {this.renderDataView()}
  
          {this.state.getProfile.fetching ? (
            <View style={styles.viewLoading}>
              <ActivityIndicator />
            </View>
          ) : null}
        </View>
      );
    }
  
    renderToolbar = () => {
      return (
        <View style={styles.toolbar}>
          <StatusBar
            hidden={false}
            backgroundColor='#103166'
            barStyle={barStyle.lightContent}
          />
          
          {/** 
          <TouchableOpacity
            style={styles.viewWrapIcLeft}
            onPress={this.onMenuPress}>
            <MaterialCommunityIcons
              name={'menu'}
              size={30}
              color={colors.white}
            />        
          </TouchableOpacity> 
          */}
  
          <View style={styles.viewWrapTitleToolbar}>
            <Text style={styles.titleToolbar}>React Native</Text>
          </View>
  
          {/* 
          <TouchableOpacity
            style={styles.viewWrapIcRight}
            onPress={this.onExitPress}>
            <MaterialCommunityIcons
              name={'exit-to-app'}
              size={30}
              color={colors.white}
            />
          </TouchableOpacity> */}
  
        </View>
      );
    };
  
    renderDataView = () => {
      if (this.state.getProfile.data) {
        return (
          
          <View style={styles.body}>
            
            
            <Image source={require('./ins.png')}  style={{width: 200, height: 200, }}/> 
  
            <Image source={require('./car.png')}  style={{width: 140, height: 140, }}/> 
            
            
            
            
            <Text style={styles.textData}>{this.state.switchValue ? 'Insurance is ON' :'Insurance is OFF'}</Text>  
                  <Switch 
                      style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }],marginTop:10 }}  
                      value={this.state.switchValue}  
                      onValueChange ={(switchValue)=>this.setState({switchValue})}/>
        
  
          </View>
        );
      } else if (this.state.getProfile.err) {
        return <NoDataView onRetryPress={this.getUserProfile} />;
      } else {
        return null;
      }
    };
  }