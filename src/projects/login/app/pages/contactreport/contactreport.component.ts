import { Component } from '@angular/core';
import { environment } from '../../../../../assets/environment';
import { HttpClient } from '@angular/common/http';
declare let $: any;
@Component({
  selector: 'app-contactreport',
  imports: [],
  templateUrl: './contactreport.component.html',
  styleUrl: './contactreport.component.scss'
})
export class ContactreportComponent {

  environment= environment;
  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
     this.http.get(environment.API_BASE_URL + '/getcustomerdet').subscribe({
        next: (res:any) =>{
          if(res.status && res.status != null && res.status === 1){
            this.loadTable(res.data);
          }else{
              this 
          }
        },
        error: err => {
          console.log(err)
          this.loadTable([]);
        }  
      });
  }



  loadTable(datajs:any){
    $('#contactReportTable').DataTable().destroy()
    var datatables_report = $('#contactReportTable');
    if ($.fn.DataTable.isDataTable(datatables_report)) {
      var table = datatables_report.DataTable();
      table.clear().draw();
      table.rows.add(datajs).draw();
    } else {
      var dt_report = datatables_report.DataTable({
        data: datajs,
        columns: [
          // columns according to JSON
          { data: '' },
          { data: 'customerName' },
          { data: 'customerEmail' },
          { data: 'customerPhoneNumber' },
          { data: 'companyNameorWebsite' },
          { data: 'uploadeddocid' },
          //

        ],
        columnDefs: [
          {
            // For Responsive
            className: 'control',
            orderable: false,
            responsivePriority: 1,
            targets: 0,
            render: function (data: any, type: any, full: any, meta: any) {
              return '';
            }
          },
          {
            // User full name and email
            targets: 1,
            responsivePriority: 1,
            render: function (data: any, type: any, full: { [x: string]: any; }, meta: any) {
              var states = ['success', 'danger', 'warning',  'primary', 'secondary'];
              var stateNum = Math.floor(Math.random() * 6);
              var $state = states[stateNum],
                $name = full['customerName'] ?? ' ',
                $initti = ""
              let $initials: [];
              try { $initials = $name.match(/\b\w/g) || [] } catch (err) { $initials = [] };
              $initti = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              var $row_output =
                '<div class="d-flex justify-content-start align-items-center user-name">' +
                '<div class="avatar-xs">' +
                '<div style="padding:7px;font-weight:600" class="avatar-title rounded-circle bg-' + $state + '-subtle text-' + $state + '">' +
                $initti +
                '</div>' +
                '</div>' +
                '<div class="d-flex flex-column ms-2 ">' +
                '<small class="emp_name text-truncate" style="font-size:11px">' +
                '<a href="javascript:void(0);" dt-user-btn class="text-body text-truncate" style="width: 100% !important;display: flex; white-space: break-spaces;" (click)="openModal(userModal)">' +
                $name +
                '</a></small>' +
                '</div>' +
                '</div>';
              return $row_output;
            }
          },
          {
            targets: 2,
            render: function (data: any, type: any, full: { [x: string]: any; }, meta: any) {
               return `<div class="d-flex align-items-center">
                          <div class="badge rounded bg-label-secondary me-2 p-1"><i class="icon-base ti ti-sm tabler-mail icon-xs text-secondary" style="inline-size: 15px;block-size: 14px;"></i></div>
                          <span>`+data+`</span>
                      </div>`

            }
          },
          {
            targets: 3,
            render: function (data: any, type: any, full: { [x: string]: any; }, meta: any) {
              return `<div class="d-flex align-items-center">
                       <div class="badge rounded bg-label-secondary me-2 p-1"><i class="icon-base ti ti-sm tabler-phone icon-xs  text-secondary" style="inline-size: 15px;block-size: 14px;"></i></div>
                       <span>`+data+`</span>
                      </div>`
            }
          },
          {
            targets: 4,
            render: function (data: any, type: any, full: { [x: string]: any; }, meta: any) {
              return `<div class="d-flex align-items-center">
                      <div class="badge rounded bg-label-secondary me-2 p-1"><i class="icon-base ti ti-sm tabler-world icon-xs text-secondary" style="inline-size: 15px;block-size: 14px;"></i></div
                      <span>`+data+`</span>
                    </div>`
            }
          },
          {
            targets: 5,
            render: function (data: any, type: any, full: { [x: string]: any; }, meta: any) {
              var $loginName = full['loginName'];
              return '<small class="small">' + $loginName + '</small>';
            }
          }
        ], rowCallback: (row: Node, data: any | object, index: number) => {
          $('[dt-user-btn]', row).off('click')
          $('[dt-user-btn]', row).on('click', () => {
         //   this.onUsernameClicked(data);
          });
          return row;
        },
        order: [[1, 'asc']],
        displayLength: 5,
        lengthMenu: [5, 10, 25, 50, 75, 100],
        language: {
          "emptyTable": "No data available in table",
          "info": "Showing _START_ to _END_ of _TOTAL_ entries",
          "infoEmpty": "Showing 0 to 0 of 0 entries",
          "lengthMenu": "Show _MENU_ entries",
          "search": "Search:",
          "zeroRecords": "No matching records found"
        },
        // For responsive popup
        responsive: {
          details: {
            display: $.fn.dataTable.Responsive.display.modal({
              header: (row: { data: () => any; }) => {
                let data = row.data();
                setTimeout(() => {
                  $('.dtr-bs-modal [dt-user-btn]').off('click')
                  $('.dtr-bs-modal [dt-user-btn]').on('click', () => {
                    // this.updateClicked(data);
                  });
                });
                return `Details of ${data['userName']}`;
              }
            }),
            type: 'column',
            renderer: (api: any, rowIdx: any, columns: any) => {
              var data = $.map(columns, function (col: any, i: any) {
                // Do not show row in modal popup if title is blank (for check box)
                return col.title !== ''
                  ? '<tr data-dt-row="' +
                  col.rowIndex +
                  '" data-dt-column="' +
                  col.columnIndex +
                  '">' +
                  '<td>' +
                  col.title +
                  ':' +
                  '</td> ' +
                  '<td>' +
                  col.data +
                  '</td>' +
                  '</tr>'
                  : '';
              }).join('');
              return data ? $('<table class="table"/><tbody />').append(data) : false;
            }
          }
        }
      });
    }

  }

}
