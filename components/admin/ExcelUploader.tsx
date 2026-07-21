'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import { Upload, CheckCircle2, AlertCircle, RefreshCw, FileSpreadsheet } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassCard } from '@/components/ui/GlassCard';
import type { CsvProductRow, CsvImportPreview } from '@/types';

export function ExcelUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CsvImportPreview | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setSyncSuccess(false);

    Papa.parse<CsvProductRow>(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        const errors: string[] = [];
        let validCount = 0;

        rows.forEach((row, i) => {
          if (!row.sku || !row.stock || !row.price) {
            errors.push(`Fila ${i + 1}: Faltan campos requeridos (SKU, stock o precio).`);
          } else if (isNaN(Number(row.stock)) || isNaN(Number(row.price))) {
            errors.push(`Fila ${i + 1}: Stock o precio no son valores numéricos válidos.`);
          } else {
            validCount++;
          }
        });

        setPreview({
          rows,
          validCount,
          errorCount: errors.length,
          errors,
        });
      },
    });
  };

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
    }, 2000);
  };

  return (
    <GlassCard hover={false} className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--primary-muted)] text-[var(--primary)] border border-[var(--glass-border)]">
            <FileSpreadsheet size={24} />
          </div>
          <div>
            <h3 className="font-display text-xl text-[var(--text-cream)]">Sincronización Masiva (CSV / Excel)</h3>
            <p className="text-xs text-[var(--text-muted)]">Actualizá stock y precios simulando el sync de 5 min con el local físico.</p>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--primary)] transition-all cursor-pointer text-center">
        <Upload size={32} className="text-[var(--primary)] mb-2 animate-bounce" />
        <span className="text-sm font-medium text-[var(--text-cream)]">
          {file ? file.name : 'Arrastrá tu archivo CSV aquí o haz clic para explorar'}
        </span>
        <span className="text-xs text-[var(--text-muted)] mt-1">Formato soportado: .csv (SKU, Nombre, Talle, Color, Stock, Precio)</span>
        <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Preview Section */}
      {preview && (
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-muted)]">Filas detectadas: <strong className="text-[var(--text-cream)]">{preview.rows.length}</strong></span>
            <div className="flex gap-3 text-xs">
              <span className="text-[var(--accent-success)] font-semibold">✓ {preview.validCount} válidas</span>
              {preview.errorCount > 0 && (
                <span className="text-[var(--accent-sale)] font-semibold">⚠ {preview.errorCount} errores</span>
              )}
            </div>
          </div>

          {/* Table Preview */}
          <div className="overflow-x-auto max-h-56 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)]">
            <table className="w-full text-xs text-left text-[var(--text-muted)]">
              <thead className="bg-[var(--glass-bg)] text-[var(--text-cream)] sticky top-0 uppercase tracking-wider">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Producto</th>
                  <th className="p-3">Talle</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--glass-border)]">
                {preview.rows.slice(0, 5).map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--glass-bg-hover)]">
                    <td className="p-3 font-mono font-bold text-[var(--primary)]">{row.sku}</td>
                    <td className="p-3 text-[var(--text-cream)]">{row.name}</td>
                    <td className="p-3">{row.size}</td>
                    <td className="p-3">{row.color}</td>
                    <td className="p-3 font-semibold">{row.stock}</td>
                    <td className="p-3">Gs. {Number(row.price || 0).toLocaleString('es-PY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Process Sync CTA */}
          <div className="flex justify-end gap-3 pt-2">
            <GlassButton
              onClick={handleSimulateSync}
              loading={isSyncing}
              disabled={preview.validCount === 0 || isSyncing}
            >
              {isSyncing ? (
                <>Sincronizando inventario...</>
              ) : (
                <>
                  <RefreshCw size={16} /> Aplicar Actualización de Stock
                </>
              )}
            </GlassButton>
          </div>
        </div>
      )}

      {syncSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3 animate-fade-in-up">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
          <div>
            <p className="font-semibold">¡Inventario sincronizado con éxito!</p>
            <p className="text-xs opacity-80">Se actualizaron {preview?.validCount} variantes de productos en la tienda.</p>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
