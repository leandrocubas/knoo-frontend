<script setup lang="ts">
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import Button from "@/components/Button.vue";
import WhatsApp from "@/components/icons/WhatsApp.vue";
import Mail from "@/components/icons/Mail.vue";
import Table from "@/components/Table.vue";
import Alert from "@/components/Alert.vue";
import ListMobile from "@/components/ListMobile.vue";
import { useSalesRecovery } from "@/composables/useSalesRecovery";
import { useUtils } from "@/composables/useUtils";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const {
  isLoading,
  abandonedCartHeaders,
  abandonedCartMobileHeaders,
  abandonedCartData,
  unpaidChargesHeaders,
  unpaidChargesData,
  abandonedCartMobileData,
  unpaidChargesMobileData,
  unpaidChargesMobileHeaders,
  paidChargesHeaders,
  paidChargesData,
  pageChanged,
  onGet,
  onGetUnpaids
} = useSalesRecovery();

onMounted(() => {
    onGet();
    onGetUnpaids();
});

const requestOnSelectedTab = (tab: any) => {
  if (tab.title == "Histórico de vendas")
    return onGet();

  if (tab.title == "Pagamentos pendentes")
    return onGetUnpaids();
}

const { isMobile } = useUtils();
</script>

<template>
  <section class="sales-recovery">
    <Alert></Alert>
    <Tabs @tabSelected="requestOnSelectedTab">
      <Tab title="Histórico de vendas">
        <Table
          v-if="!isMobile"
          :headers="paidChargesHeaders"
          :rows="paidChargesData"
          :isLoading
        >
          <template #actions="{ row }">
            <WhatsApp />
            <Mail />
          </template>
        </Table>

        <ListMobile :headers="paidChargesHeaders" :rows="paidChargesData" v-else>
        </ListMobile>
      </Tab>

      <Tab title="Pagamentos pendentes">
        <Table
          v-if="!isMobile"
          :headers="unpaidChargesHeaders"
          :rows="unpaidChargesData"
          :isLoading
        >
          <template #actions="{ row }">
            <WhatsApp />
            <Mail />
          </template>
        </Table>

        <ListMobile
          :headers="unpaidChargesHeaders"
          :rows="unpaidChargesData"
          v-else
        >
        </ListMobile>
      </Tab>

      <Tab :disabled="true" title="Carrinho abandonado">
        <Table
                v-if="!isMobile"
                @page="pageChanged"
                :headers="abandonedCartHeaders"
                :rows="abandonedCartData"
                :isLoading>
                <template #actions="{ row }">
                    <WhatsApp />
                    <Mail />
                </template>
            </Table>

            <ListMobile
                :headers="abandonedCartMobileHeaders"
                :rows="abandonedCartMobileData"
                v-else>
                <template #actions="{ row }">
                    <WhatsApp />
                    <Mail />
                </template>
            </ListMobile>
      </Tab>
      <Tab :disabled="true" title="Assinaturas não pagas"></Tab>
      <template #action>
        <Button class="sales-recovery__export-button" type="secondary"
          >Exportar CSV</Button
        >
      </template>
    </Tabs>
  </section>
</template>

<style lang="scss" scoped>
.sales-recovery {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__export-button {
    width: 12rem;
    position: relative;
  }
}
</style>
