import React, { useMemo, useState, useEffect } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// uuid is a library for generating unique id
import { v4 as uuidv4 } from 'uuid';

// @mui material components
import { Table as MuiTable, Checkbox } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';

// Soft UI Dashboard React base styles
import colors from 'assets/theme/base/colors';
import typography from 'assets/theme/base/typography';
import borders from 'assets/theme/base/borders';

function Table({ columns, rows, handleOpen, setDataCheckedState }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(rows.slice(0, pageSize));
  const [pageNumber, setPageNumber] = useState(1);
  const [pageTotal, setPageTotal] = useState(Math.ceil(rows.length / pageSize));

  useEffect(() => {
    setPageTotal(Math.ceil(rows.length / pageSize));
    setPage(rows.slice(0, pageSize));
  }, [rows, pageSize]);

  const sliceIndex = (pageNumber, pageSize) => {
    const startIndex = pageNumber * pageSize - pageSize;
    const endIndex = startIndex + pageSize;
    return {
      startIndex,
      endIndex,
    };
  };

  const handleClickChangePage = (index) => {
    if (pageNumber + index > pageTotal || pageNumber + index < 1) {
      return;
    }
    const newPageNumber = pageNumber + index;
    setPageNumber(newPageNumber);
    const { startIndex, endIndex } = sliceIndex(newPageNumber, pageSize);
    setPage(rows.slice(startIndex, endIndex));
  };

  const hendlerChangePageSize = (e) => {
    const newpageSize = Number(e.target.value);
    setPageSize(newpageSize);
    setPageNumber(1);
    const { startIndex, endIndex } = sliceIndex(1, newpageSize);
    setPage(rows.slice(startIndex, endIndex));
    setPageTotal(Math.ceil(rows.length / newpageSize));
  };

  const renderPagination = () => {
    return (
      <SuiBox
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 1,
        }}
      >
        <SuiTypography
          variant="span"
          fontWeight="light"
          color="secondary"
          sx={{ padding: 1, fontSize: 12, width: '100%' }}
        >
          Página {pageNumber} de {pageTotal}
        </SuiTypography>
        <SuiBox
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '20%',
            padding: 1,
          }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => handleClickChangePage(-1)}
          >
            <ArrowLeftIcon color="primary" />
          </IconButton>
          <Select value={pageSize} label="Page" onChange={hendlerChangePageSize} autoWidth>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => handleClickChangePage(1)}
          >
            <ArrowRightIcon color="primary" />
          </IconButton>
        </SuiBox>
      </SuiBox>
    );
  };

  const renderColumns = columns.map(({ label, name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SuiBox
        key={label}
        component="th"
        width={width || 'auto'}
        pt={1.5}
        pb={1.25}
        pl={align === 'left' ? pl : 3}
        pr={align === 'right' ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {label.toUpperCase()}
      </SuiBox>
    );
  });

  // const handleChangea = ({ target }) => {
  //   const { value } = target;
  //   if (target.checked) {
  //     setDataCheckedState((prev) => [...prev, value]);
  //   }
  //   if (!target.checked) {
  //     setDataCheckedState((prev) => {
  //       const current = prev.indexOf(`${value}`);
  //       const result = prev.filter((_, i) => i !== current);
  //       return result;
  //     });
  //   }
  // };

  const renderRows = page.map((row, key) => {
    const rowKey = `row-${key}`;
    const tableRow = columns.map(({ name, align }) => {
      row['edit'] = 'edit';
      row['checkbox'] = 'checkbox';
      const template = (
        <SuiBox
          onClick={(e) => handleChangea(e)}
          key={uuidv4()}
          component="td"
          p={1}
          textAlign={align}
          borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
        >
          <SuiTypography
            variant="button"
            fontWeight="regular"
            color="secondary"
            sx={{ display: 'inline-block', width: 'max-content' }}
          >
            {row[name] === 'edit' ? (
              <Button
                title="Editar"
                sx={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => {
                  setId(row['documentId']);
                  setEdit(true);
                  handleOpen();
                }}
              >
                <Icon>edit</Icon>
              </Button>
            ) : row[name] === 'checkbox' ? (
              <div>
                <Checkbox
                  key={row['documentId']}
                  name={row['documentId']}
                  value={row['documentId']}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            ) : (
              <>{row[name]}</>
            )}
          </SuiTypography>
        </SuiBox>
      );
      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SuiBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
        {renderPagination()}
      </TableContainer>
    ),
    [columns, rows, page, pageSize],
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
