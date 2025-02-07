import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Snackbar, Alert, Box } from '@mui/material';
import NavigationComponent from './Navigation';
import TodoDataGrid from './DataGrid/Grid';
import SplashScreen from './SplashScreen';
import FileTabs from './FileTabs.tsx';
import { baseTheme, darkTheme, lightTheme } from './Themes';
import DrawerComponent from './Drawer/Drawer';
import Search from './Search';
import TodoDialog from './TodoDialog/TodoDialog';
import Archive from './Archive';
import ToolBar from './ToolBar';
import ContextMenu from './ContextMenu';
import { Sorting } from '../main/util';
import { I18nextProvider } from 'react-i18next';
import { i18n } from './LanguageSelector';
import Settings from './Settings';
import { translatedAttributes } from './Shared';
import './App.scss';

const { ipcRenderer, store } = window.api;

const App = () => {
  const [files, setFiles] = useState<string[]>(store.get('files') || null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(store.get('isDrawerOpen') || false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(store.get('isSearchOpen') || false);
  const [splashScreen, setSplashScreen] = useState<string | null>(null);
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [snackBarContent, setSnackBarContent] = useState<string | null>(null);
  const [snackBarSeverity, setSnackBarSeverity] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [searchString, setSearchString] = useState(null);
  const [todoObjects, setTodoObjects] = useState<object>(null);
  const [todoObject, setTodoObject] = useState(null);
  const [headers, setHeaders] = useState<object>(null);
  const [filters, setFilters] = useState<object>({});
  const [attributes, setAttributes] = useState<object>({});
  const [sorting, setSorting] = useState<Sorting>(store.get('sorting') || null);
  const searchFieldRef = useRef(null);
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(store.get('isNavigationOpen'));
  const [shouldUseDarkColors, setShouldUseDarkColors] = useState<boolean>(store.get('shouldUseDarkColors') || false);
  const [showFileTabs, setShowFileTabs] = useState<boolean>(store.get('showFileTabs'));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [contextMenuItems, setContextMenuItems] = useState([]);
  const [attributeMapping, setAttributeMapping] = useState(translatedAttributes(i18n.t) || {});
  const [textFieldValue, setTextFieldValue] = useState('');
  
  const handleRequestedData = (todoObjects: object, attributes: object, headers: object, filters: object) => {
    if(headers) setHeaders(headers);
    if(attributes) setAttributes(attributes);
    if(filters) setFilters(filters);
    if(todoObjects) setTodoObjects(todoObjects);
    setSplashScreen(null);
  };

  const handleUpdateFiles = (files: object) => {
    setFiles(files);
  };

  const handleUpdateSorting = (sorting: object) => {
    setSorting(sorting)
  };

  const handleSetIsSearchOpen = () => {
    setIsSearchOpen(prevIsSearchOpen => !prevIsSearchOpen);
  };

  const handleSetIsNavigationOpen = () => {
    setIsNavigationOpen(prevIsNavigationOpen => !prevIsNavigationOpen);
  };

  const handleSetShouldUseDarkColors = (shouldUseDarkColors: boolean) => {
    setShouldUseDarkColors(shouldUseDarkColors);
  };

  const handleSetShowFileTabs = () => {
    setShowFileTabs(prevShowFileTabs => !prevShowFileTabs);
  };

  const handleSetIsDrawerOpen = () => {
    setIsDrawerOpen(prevIsDrawerOpen => !prevIsDrawerOpen);
  };

  const handleSetIsSettingsOpen = () => {
    setIsSettingsOpen(prevIsSettingsOpen => !prevIsSettingsOpen);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const filePath = event.dataTransfer.files[0].path;
    if(typeof filePath === 'string') ipcRenderer.send('addFile', filePath);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleAlertClose = () => {
    setSnackBarContent(null);
    setSnackBarOpen(false);
  };

  const handleWriteTodoToFile = (response: any) => {
    if (response instanceof Error) {
      setSnackBarSeverity('error');
      setSnackBarContent(response.message);
    } else {
      setDialogOpen(false);
    }
  };  

  useEffect(() => {
    if(!headers) {
      return;
    } else  if (headers.availableObjects === 0) {
      setSplashScreen('noTodosAvailable');
      setIsDrawerOpen(false);
    } else if (headers.visibleObjects === 0) {
      setSplashScreen('noTodosVisible');
    } else {
      setSplashScreen(null);
    }
  }, [headers]);

  useEffect(() => {
    if(files === null || files?.length === 0) {
      setTodoObjects(null);
      setHeaders(null);
      setSplashScreen('noFiles');
    } else {
      ipcRenderer.send('requestData');
    }
  }, [files]);

  useEffect(() => {
    store.set('sorting', sorting)
  }, [sorting]);

  useEffect(() => {
    store.set('isDrawerOpen', isDrawerOpen)
  }, [isDrawerOpen]);

  useEffect(() => {
    store.set('isSearchOpen', isSearchOpen)
  }, [isSearchOpen]);

  useEffect(() => {
    store.set('', isNavigationOpen)
  }, [isNavigationOpen]);

  useEffect(() => {
    if(!snackBarContent) return;
    setSnackBarOpen(true);
  }, [snackBarContent]);

  useEffect(() => {
    if(!dialogOpen) {
      setTodoObject(null);
      setTextFieldValue('');
    }
  }, [dialogOpen]); 

  useEffect(() => {
    ipcRenderer.on('requestData', handleRequestedData);
    ipcRenderer.on('updateFiles', handleUpdateFiles);
    ipcRenderer.on('updateSorting', handleUpdateSorting);
    ipcRenderer.on('setIsSearchOpen', handleSetIsSearchOpen);
    ipcRenderer.on('setIsNavigationOpen', handleSetIsNavigationOpen);
    ipcRenderer.on('setShouldUseDarkColors', handleSetShouldUseDarkColors);
    ipcRenderer.on('setShowFileTabs', handleSetShowFileTabs);
    ipcRenderer.on('setIsDrawerOpen', handleSetIsDrawerOpen);
    ipcRenderer.on('setIsSettingsOpen', handleSetIsSettingsOpen);
    ipcRenderer.on('writeTodoToFile', handleWriteTodoToFile);
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);
    return () => {      
      ipcRenderer.removeListener('requestData', handleRequestedData);
      ipcRenderer.removeListener('updateFiles', handleUpdateFiles);
      ipcRenderer.removeListener('updateSorting', handleUpdateSorting);
      ipcRenderer.removeListener('setIsSearchOpen', handleSetIsSearchOpen);
      ipcRenderer.removeListener('setIsNavigationOpen', handleSetIsNavigationOpen);
      ipcRenderer.removeListener('setShouldUseDarkColors', handleSetShouldUseDarkColors);
      ipcRenderer.removeListener('setShowFileTabs', handleSetShowFileTabs);
      ipcRenderer.removeListener('setIsDrawerOpen', handleSetIsDrawerOpen);
      ipcRenderer.removeListener('setIsSettingsOpen', handleSetIsSettingsOpen);
      ipcRenderer.removeListener('writeTodoToFile', handleWriteTodoToFile);
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };    
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={shouldUseDarkColors ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box
            className={`flexContainer ${isNavigationOpen ? '' : 'hideNavigation'} ${shouldUseDarkColors ? 'darkTheme' : 'lightTheme'}`}  
          >
          <NavigationComponent
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            setDialogOpen={setDialogOpen}
            files={files}
            headers={headers}
            isNavigationOpen={isNavigationOpen}
            setIsNavigationOpen={setIsNavigationOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            setTodoObject={setTodoObject}
          />
          {files?.length > 0 && (
            <>
              <DrawerComponent 
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                attributes={attributes}
                filters={filters}
                sorting={sorting}
                setSorting={setSorting}
                attributeMapping={attributeMapping}
              />
            </>
          )}
          <Box className="flexItems">
            {files?.length > 0 && (
            <>
              {!isSearchOpen && showFileTabs ? 
              <FileTabs 
                files={files}
                setContextMenuPosition={setContextMenuPosition}
                setContextMenuItems={setContextMenuItems}              
               /> : null}
              {headers?.availableObjects > 0 ?
              <>
                <Search
                  headers={headers}
                  searchString={searchString}
                  setSearchString={setSearchString}
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                  searchFieldRef={searchFieldRef}
                />
                <ToolBar
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                  searchFieldRef={searchFieldRef}
                />
              </>
              : null }
            </>
            )}
            <TodoDataGrid
              todoObjects={todoObjects}
              setTodoObject={setTodoObject}
              attributes={attributes}
              filters={filters}
              setDialogOpen={setDialogOpen}
              contextMenuPosition={contextMenuPosition}
              setContextMenuPosition={setContextMenuPosition}
              contextMenuItems={contextMenuItems}
              setContextMenuItems={setContextMenuItems}
            />
            <SplashScreen 
              screen={splashScreen}
              setDialogOpen={setDialogOpen}
              setSearchString={setSearchString}
            />
          </Box>
        </Box>
        <TodoDialog
          todoObject={todoObject}
          setTodoObject={setTodoObject}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          attributes={attributes}
          setSnackBarSeverity={setSnackBarSeverity}
          setSnackBarContent={setSnackBarContent}
          textFieldValue={textFieldValue}
          setTextFieldValue={setTextFieldValue}
          shouldUseDarkColors={shouldUseDarkColors}
        />
        <Settings 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          setAttributeMapping={setAttributeMapping}
        />        
        <ContextMenu
          contextMenuPosition={contextMenuPosition}
          setContextMenuPosition={setContextMenuPosition}
          contextMenuItems={contextMenuItems}
          setContextMenuItems={setContextMenuItems}        
          setSnackBarSeverity={setSnackBarSeverity}
          setSnackBarContent={setSnackBarContent}        
        />
        <Snackbar 
          open={snackBarOpen}
          onClose={handleAlertClose}
          autoHideDuration={3000}
        >
          <Alert
            severity={snackBarSeverity}
          >
            {snackBarContent}
          </Alert>
        </Snackbar>
        <Archive
          setSnackBarSeverity={setSnackBarSeverity}
          setSnackBarContent={setSnackBarContent}
        />
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;