import React, { FC } from 'react';
import { Button, Box } from '@mui/material';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { withTranslation } from 'react-i18next';
import { i18n } from './LanguageSelector';
import './SplashScreen.scss';

interface SplashScreen {
  screen: 'noTodosVisible' | 'noTodosAvailable' | 'noFiles' | null;
  setSearchString: (search: string) => void;
  setDialogOpen: (isOpen: boolean) => void;
}

const ipcRenderer = window.api.ipcRenderer;
const store = window.api.store;

const SplashScreen: FC<SplashScreen> = ({
  screen,
  setSearchString,
  setDialogOpen,
  t,
}: SplashScreenProps) => {
  const handleCreateTodo = () => {
    setDialogOpen(true);
  };

  const handleReset = () => {
    store.setFilters([]);
    setSearchString('');
  };

  const handleOpenFile = () => {
    ipcRenderer.send('openFile');
  };

  const handleCreateFile = () => {
    ipcRenderer.send('createFile');
  };

  return (
    <Box id='splashScreen'>
      {screen === 'noTodosVisible' && (
        <>
          <DryCleaningIcon />
          <p>{t('splashscreen.noTodosVisible.text')}</p>
          <Box className="buttons">
            <Button variant='contained' onClick={handleReset}>
              {t('splashscreen.noTodosVisible.reset')}
            </Button>
          </Box>
        </>
      )}
      {screen === 'noTodosAvailable' && (
        <>
          <BeachAccessIcon />
          <p>{t('splashscreen.noTodosAvailable.text')}</p>
          <Box className="buttons">
            <Button variant='contained' onClick={handleCreateTodo}>
              {t('splashscreen.noTodosAvailable.create')}
            </Button>
          </Box>
        </>
      )}
      {screen === 'noFiles' && (
        <Box className="fileDropZone">
          <SaveAltIcon />
          <p>{t('splashscreen.noFiles.text')}</p>
          <Box className="buttons">
            <Button variant='contained' onClick={handleOpenFile}>
              {t('splashscreen.noFiles.open')}
            </Button>
            <Button variant='contained' onClick={handleCreateFile}>
              {t('splashscreen.noFiles.create')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default withTranslation()(SplashScreen);
