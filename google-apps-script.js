const SHEET_NAME = 'Applications';

const HEADERS = [
  'id',
  'company',
  'position',
  'location',
  'appliedDate',
  'jobType',
  'source',
  'jobUrl',
  'status',
  'notes',
  'statusHistory',
  'createdAt',
  'updatedAt'
];

/**
 * Inisialisasi sheet jika belum ada atau kosong
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Jika sheet kosong, buat header
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    // Format header agar tebal
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#F1F5F9');
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Handle GET Request (Mengambil semua data lamaran)
 */
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    
    // Jika hanya ada header atau kosong
    if (lastRow <= 1) {
      return createJsonResponse({ status: 'success', data: [] });
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    
    const applications = data.map((row) => {
      let statusHistory = [];
      try {
        if (row[10]) {
          statusHistory = typeof row[10] === 'string' ? JSON.parse(row[10]) : row[10];
        }
      } catch (err) {
        statusHistory = [];
      }

      return {
        id: String(row[0] || ''),
        company: String(row[1] || ''),
        position: String(row[2] || ''),
        location: String(row[3] || ''),
        appliedDate: formatDateValue(row[4]),
        jobType: String(row[5] || 'full-time'),
        source: String(row[6] || 'LinkedIn'),
        jobUrl: String(row[7] || ''),
        status: String(row[8] || 'applied'),
        notes: String(row[9] || ''),
        statusHistory: statusHistory,
        createdAt: formatDateValue(row[11]),
        updatedAt: formatDateValue(row[12])
      };
    });
    
    return createJsonResponse({ status: 'success', data: applications });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

/**
 * Handle POST Request (Create, Update, Delete)
 */
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    let body = {};
    
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
    
    const action = body.action || 'create';
    const payload = body.data || {};
    
    if (action === 'create' || action === 'add') {
      return handleCreate(sheet, payload);
    } else if (action === 'update') {
      return handleUpdate(sheet, payload);
    } else if (action === 'delete') {
      return handleDelete(sheet, payload.id || body.id);
    } else {
      return createJsonResponse({ status: 'error', message: 'Action tidak dikenali: ' + action });
    }
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

/**
 * Tambah baris baru
 */
function handleCreate(sheet, data) {
  if (!data.id) {
    data.id = Utilities.getUuid();
  }
  
  const now = new Date().toISOString();
  if (!data.createdAt) data.createdAt = now;
  data.updatedAt = now;
  
  const row = [
    data.id || '',
    data.company || '',
    data.position || '',
    data.location || '',
    data.appliedDate || '',
    data.jobType || 'full-time',
    data.source || 'LinkedIn',
    data.jobUrl || '',
    data.status || 'applied',
    data.notes || '',
    JSON.stringify(data.statusHistory || [{ status: data.status || 'applied', changedAt: now }]),
    data.createdAt,
    data.updatedAt
  ];
  
  sheet.appendRow(row);
  return createJsonResponse({ status: 'success', data: data });
}

/**
 * Update baris yang sudah ada berdasarkan ID
 */
function handleUpdate(sheet, data) {
  if (!data.id) {
    return createJsonResponse({ status: 'error', message: 'ID wajib disertakan untuk update' });
  }
  
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return createJsonResponse({ status: 'error', message: 'Data tidak ditemukan' });
  }
  
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let rowIndex = -1;
  
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(data.id)) {
      rowIndex = i + 2; // Baris di sheet (1-based, +1 header, +1 0-index)
      break;
    }
  }
  
  if (rowIndex === -1) {
    return createJsonResponse({ status: 'error', message: 'Lamaran dengan ID ' + data.id + ' tidak ditemukan' });
  }
  
  data.updatedAt = new Date().toISOString();
  
  const updatedRow = [
    data.id || '',
    data.company || '',
    data.position || '',
    data.location || '',
    data.appliedDate || '',
    data.jobType || 'full-time',
    data.source || 'LinkedIn',
    data.jobUrl || '',
    data.status || 'applied',
    data.notes || '',
    JSON.stringify(data.statusHistory || []),
    data.createdAt || '',
    data.updatedAt
  ];
  
  sheet.getRange(rowIndex, 1, 1, HEADERS.length).setValues([updatedRow]);
  return createJsonResponse({ status: 'success', data: data });
}

/**
 * Hapus baris berdasarkan ID
 */
function handleDelete(sheet, id) {
  if (!id) {
    return createJsonResponse({ status: 'error', message: 'ID wajib disertakan untuk delete' });
  }
  
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return createJsonResponse({ status: 'error', message: 'Sheet kosong' });
  }
  
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let rowIndex = -1;
  
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) {
      rowIndex = i + 2;
      break;
    }
  }
  
  if (rowIndex === -1) {
    return createJsonResponse({ status: 'error', message: 'Lamaran dengan ID ' + id + ' tidak ditemukan' });
  }
  
  sheet.deleteRow(rowIndex);
  return createJsonResponse({ status: 'success', message: 'Data berhasil dihapus', id: id });
}

/**
 * Format helper tanggal dari Google Sheets
 */
function formatDateValue(val) {
  if (!val) return '';
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd');
  }
  return String(val);
}

/**
 * Helper JSON Response
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
